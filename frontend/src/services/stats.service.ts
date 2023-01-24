// @ts-ignore
import { httpService } from './http.service.js'
import { Stats } from '../interfaces/stats.js'

export const statsService = {
    queryStats,
    saveStats
}

const KEY = 'stats'


function queryStats() {
    return httpService.get(KEY)
}

function saveStats(stats: Stats) {
    return httpService.post(KEY, stats)
}
