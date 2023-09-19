export interface Round {
    roundNumer: number,
    sequence: [],
    playerInput: string[],
    roundOver: boolean
}

export interface Rounds extends Array<Round>{}