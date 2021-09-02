package services;

import entities.Account;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import repositories.AccountRepo;

import javax.transaction.Transactional;

@Component
public class AccountService {

    private static final Logger LOGGER = LoggerFactory.getLogger(AccountService.class);

    @Autowired
    private AccountRepo accountRepo;

    @Transactional
    public void addAccount(Account account){
        //Account account1 = accountRepo.findAllById(account.getId());
        //if(account1.isPresent()) {
       //    throw new ExistingAccountException("")
        }


        }

