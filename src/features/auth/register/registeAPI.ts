import {RegisterParamsType} from './registerReducer';
import {instance} from '../../mainPage/instanceAPI';


export const authAPI = {
    register(data: RegisterParamsType) {
        return instance.post<RegisterParamsType>('/auth/register', data);
    }
}