package repositories;
import javax.transaction.Transactional;

import entities.Account;
import org.springframework.data.repository.CrudRepository;



@Transactional
public interface AccountRepo extends CrudRepository <Account , Integer> {
    public Account addAccount (Account account);
}




