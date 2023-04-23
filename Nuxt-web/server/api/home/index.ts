import {IResData, IResPage} from "~/global";
import {useGet} from "~/composables/useHttp";

export default defineEventHandler(async () => {
    // banner数据
    const getBannerRequest = useGet<IResPage<any>>('/basic/banner/list')
    // 影视数据
    const getMovieRequest = useGet<IResData<any>>('/web/index')
    // 获取友情链接
    const getLinks = useGet<IResData<any>>('/basic/link/all')

    const [banner, movie, links] = await Promise.all([getBannerRequest, getMovieRequest, getLinks])
    return {
        banner: banner.rows,
        movieDataList: movie.data,
        links: links.data
    }
})
