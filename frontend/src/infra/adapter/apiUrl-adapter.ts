export class ApiUrlAdapter {
  getUrl(path: string): string {
    return `${process.env.NEXT_PUBLIC_API_URL ?? ''}${path}`
  }
}
