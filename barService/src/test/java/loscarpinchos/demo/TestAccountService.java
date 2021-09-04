package loscarpinchos.demo;

import entities.Account;
import entities.Password;
import exceptions.ExistingAccountException;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit4.SpringRunner;
import repositories.AccountRepo;
import services.AccountService;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

@RunWith(SpringRunner.class)
@DataJpaTest
public class TestAccountService {
    @Autowired
    private AccountService accountService;
    @Autowired
    private AccountRepo accountRepo;

    private Account account = new Account();
    private Password pass = new Password();

    @Before
    public void setUp() throws Exception {
        account.setName("Prueba1");
        pass.setPassword("hola");
        account.setPassword(pass);
        account.setEmail("sofi@capa");
        account.setManager("sofia");
        accountRepo.save(account);
    }

    @Test
    public void testCuentaExistente(){
        assertThrows(ExistingAccountException.class,(()-> accountService.addAccount(account)));

    }

}
