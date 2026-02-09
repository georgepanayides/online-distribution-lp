const ICONS: Record<string, string> = {
  AFTERSHIP: "/icons/integrations/AFTERSHIP.svg",
  AMAZON: "/icons/integrations/AMAZON.svg",
  AMAZONMARKETPLACE: "/icons/integrations/AMAZON.svg",
  BIGCOMMERCE: "/icons/integrations/BIGCOMMERCE.svg",
  BUSINESSCENTRAL: "/icons/integrations/BUSINESS%20CENTRLA.svg",
  CIN7: "/icons/integrations/cin7.svg",
  DYNAMICS365: "/icons/integrations/DYNAMIC365.svg",
  EXTENSIV: "/icons/integrations/EXTENSIV.svg",
  KLAVIYO: "/icons/integrations/KLAVIYO.svg",
  LOOPRETURNS: "/icons/integrations/LOOP%20RETURNS.svg",
  MAGENTO: "/icons/integrations/MAGNETO.svg",
  MYOB: "/icons/integrations/MYOB%20PAYMENTS.svg",
  MYOBACUMATICA: "/icons/integrations/MYOB-ERP.svg",
  NETSUITE: "/icons/integrations/NETSUITE.svg",
  ODOO: "/icons/integrations/ODOO.svg",
  ORACLE: "/icons/integrations/ORACLE.svg",
  QUICKBOOKS: "/icons/integrations/QUIKCEN.svg",
  QUICKEN: "/icons/integrations/QUICKEN.svg",
  REBOUND: "/icons/integrations/REBOUND.svg",
  SALESFORCE: "/icons/integrations/SALESFORCE.svg",
  SAP: "/icons/integrations/SAP.svg",
  SHOPIFY: "/icons/integrations/SHOPIFY.svg",
  SHOPIFYPLUS: "/icons/integrations/SHOPIFY.svg",
  SPREECOMMERCE: "/icons/integrations/SPREECOMMERCE.svg",
  STARSHIPIT: "/icons/integrations/STARSHIPIT.svg",
  UNLEASHED: "/icons/integrations/UNLEASHED.svg",
  WIX: "/icons/integrations/WIX.svg",
  WOOCOMMERCE: "/icons/integrations/WOOCOMERCE.svg",
  XERO: "/icons/integrations/XERO.svg",
  ZOHOCRM: "/icons/integrations/ZOHOCRM.svg",
  ZOHO: "/icons/integrations/ZOHOCRM.svg",
};

function normalizeIntegrationName(name: string): string {
  return name.trim().toUpperCase().replace(/[^A-Z0-9]+/g, "");
}

export function getIntegrationIconPath(name: string): string | null {
  const key = normalizeIntegrationName(name);
  return ICONS[key] ?? null;
}
