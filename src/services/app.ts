import request from '../utils/request';
import api from '../config/api';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const getUserCurrentData = async () =>{
    return await request({
        method: 'get',
        url: api.user_current,
    })
}