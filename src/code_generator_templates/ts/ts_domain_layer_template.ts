export function getTSDomainLayerCodeTemplate(featureClassName: string): string {
  const template = `export interface ${featureClassName}Repository {}`;

  return template;
}
