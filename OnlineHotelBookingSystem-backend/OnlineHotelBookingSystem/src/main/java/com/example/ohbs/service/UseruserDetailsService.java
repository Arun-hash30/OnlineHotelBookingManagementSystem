package com.example.ohbs.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.ohbs.repository.UserRepository;
import com.example.ohbs.model.User;

@Service
public class UseruserDetailsService implements UserDetailsService{

	@Autowired
	private UserRepository userRepository;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User result=userRepository.findByName(username);
		if(result==null) {
			throw new UsernameNotFoundException(username+ "user name not found");
		}
		UseruserDetails uiud=new UseruserDetails(result);
		return uiud;
	}

}
