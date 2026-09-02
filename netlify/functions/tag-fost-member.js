// netlify/functions/tag-fost-member.js
// Tags a newly registered customer as a FOST member in Shopify Admin, right
// after signup (called from FostAuthModal.tsx) — the Admin API access
// token never reaches the browser, so this proxies the tag update
// server-side, same reasoning as admin-orders.js.
//
// Unlike admin-orders.js, this endpoint is called from the PUBLIC signup
// flow (any visitor creating an account), not the internal admin
// dashboard — so it intentionally does NOT require the signed admin
// session token that admin-orders.js checks for order data. It only
// accepts a Shopify customer GID and adds one fixed tag, which is a
// low-risk operation even if called with an unexpected ID: every
// registered customer is already a FOST member per OSTSOME's program
// rules, so at worst this just tags someone slightly early/late relative
// to their actual signup.

const SHOPIFY_STORE_DOMAIN = '454e76.myshopify.com';
const API_VERSION = '2025-10';

// Basic shape check so we don't blindly forward garbage to Shopify —
// Shopify customer GIDs always look like gid://shopify/Customer/1234567890
const CUSTOMER_GID_PATTERN = /^gid:\/\/shopify\/Customer\/\d+$/;

exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const adminToken = process.env.SHOPIFY_ADMIN_TOKEN;
  if (!adminToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Server is missing SHOPIFY_ADMIN_TOKEN' }),
    };
  }

  let customerId;
  try {
    ({ customerId } = JSON.parse(event.body || '{}'));
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  if (!customerId || !CUSTOMER_GID_PATTERN.test(customerId)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid or missing customerId' }) };
  }

  // tagsAdd only ADDS the given tags to whatever the resource already
  // has — unlike customerUpdate's `tags` field, which REPLACES the whole
  // tag list. Using tagsAdd means this can never wipe out tags set
  // elsewhere (manually in Shopify Admin, by another app, etc.).
  const query = `
    mutation TagFostMember($id: ID!, $tags: [String!]!) {
      tagsAdd(id: $id, tags: $tags) {
        node { id }
        userErrors { field message }
      }
    }
  `;

  try {
    const shopifyResponse = await fetch(
      `https://${SHOPIFY_STORE_DOMAIN}/admin/api/${API_VERSION}/graphql.json`,
      {
        method: 'POST',
        headers: {
          'X-Shopify-Access-Token': adminToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query,
          variables: { id: customerId, tags: ['fost-member'] },
        }),
      }
    );

    const result = await shopifyResponse.json();
    const userErrors = result?.data?.tagsAdd?.userErrors ?? [];

    if (userErrors.length > 0) {
      return {
        statusCode: 422,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Shopify rejected the tag update', details: userErrors }),
      };
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to reach Shopify Admin API' }),
    };
  }
};
