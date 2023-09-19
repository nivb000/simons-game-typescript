// @ts-ignore
import { httpService } from './http.service.js'
import { Stats } from '../interfaces/stats.js'

export const statsService = {
    queryStats,
    saveStats
}

const KEY = 'stats'


async function queryStats() {
    return await httpService.get(KEY)
}

async function saveStats(stats: Stats) {
    return await httpService.post(KEY, stats)
}
