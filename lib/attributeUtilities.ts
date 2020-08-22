export function getAttributeValue(attributeString: string, name: string): any {
  const attributes = JSON.parse(attributeString);
  return attributes[name] || "";
}

export function setAttributeValue(name: string, value: any): string {
  const something = {};
  something[name] = value;
  return JSON.stringify(something);
}