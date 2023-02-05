package src.main.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import src.main.daos.UserDao;
import src.main.models.User;

@Service
public class UserService {
    @Autowired
    private UserDao userDao;
    public int createUser(User user) {
        return this.userDao.saveUser(user);
    }
}
