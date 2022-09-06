export interface pagination {
  limit: number,
  page: number,
  title?: string | undefined,
  id?: string | undefined,
}

export interface matchUserContent {
  id: string,
  userId: number,
  filmingCosts: string,
  launchDate: string,
  advance: string,
  feePaid: string
  recoveredCosts: string
}
