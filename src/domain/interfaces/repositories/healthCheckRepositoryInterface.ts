export default interface HealthCheckRepositoryInterface {
  findStatus(): Promise<string>;
}
