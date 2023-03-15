import {IResData, IResPage} from "~/global";

type TDict = {
    dictValue: string
    dictLabel: string
    rows: Object[]
    genres: Object[]
}

export default defineEventHandler(async () => {
    const runtimeConfig = useRuntimeConfig()
    // banner数据
    const getBannerRequest = $fetch<IResPage<any[]>>(runtimeConfig.baseUrl + '/basic/banner/list')
    // 影视数据
    const getMovieRequest = $fetch<IResData<TDict[]>>(runtimeConfig.baseUrl + '/web/index')

    const [banner, movie] = await Promise.all([getBannerRequest, getMovieRequest])

    return [
        banner.rows,
        movie.data
    ]
})
