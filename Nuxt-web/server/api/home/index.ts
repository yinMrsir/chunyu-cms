import {IResData, IResPage} from "~/global";
import {useGet} from "~/composables/useHttp";

export default defineEventHandler(async () => {
    // banner数据
    const getBannerRequest = useGet<IResPage<any>>('/basic/banner/list')
    // 影视数据
    const getMovieRequest = useGet<IResData<any>>('/web/index')

    const [banner, movie] = await Promise.all([getBannerRequest, getMovieRequest])
    return {
        banner: banner.rows,
        movieDataList: movie.data
    }
})
