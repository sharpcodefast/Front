import { httpClient } from '../../shared/services';
import { apiConstants } from '../shared/config/config';

export default new class UsersService {
    fetchUsers() {
        const url = apiConstants.users;
        return httpClient.get(url).then(res => res.data);
    }
}