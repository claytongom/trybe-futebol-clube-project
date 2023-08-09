export default function mapStatus(status: string): number {
  switch (status) {
    case 'SUCCESSFUL': return 200;
    case 'OK': return 201;
    case 'INVALID_DATA': return 400;
    case 'INVALID_USER_DATA': return 401;
    case 'NOT_FOUND': return 404;
    case 'CONFLICT': return 422;
    default: return 500;
  }
}
