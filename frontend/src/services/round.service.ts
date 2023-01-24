// @ts-ignore
import { httpService } from './http.service.js'
import { Round } from '../interfaces/round.js'
export const roundService = {
    getById,
    query,
    remove,
    save
}

const KEY = 'round'

function query() {
    return httpService.get(KEY)
}

function getById(roundId: string) {
    return httpService.get(`${KEY}/${roundId}`)
}

function remove(roundId: string) {
    return httpService.delete(`${KEY}/${roundId}`)
}

function save(round: Round) {
    return httpService.post(KEY, round)
}