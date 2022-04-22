export interface Training {
    id?: number,
    name: string,
    description: string,
    price: number,
    startingDate: string,
    endingDate: string,
    category: string,
    cover?: string
}