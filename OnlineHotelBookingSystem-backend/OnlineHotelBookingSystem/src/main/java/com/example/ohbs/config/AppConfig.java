package com.example.ohbs.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.example.ohbs.service.UseruserDetailsService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class AppConfig
{
 
	//Authentication
	@Bean
	public UserDetailsService userDetServ()
	{
		/*
		 * UserDetails admin=User.withUsername("abhi") .password(pw.encode("pwd1"))
		 * .roles("ADMIN") .build(); UserDetails user1=User.withUsername("sheela")
		 * .password(pw.encode("pwd2")) .roles("USER") .build(); UserDetails
		 * user2=User.withUsername("purush") .password(pw.encode("pwd3")) .roles("USER")
		 * .build();
		 */
		 
		 return new UseruserDetailsService();
	}
	
	@Bean//Encrypiting the passwords
	public PasswordEncoder endode()
	{
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public AuthenticationProvider provider()
	{
		DaoAuthenticationProvider dao=new DaoAuthenticationProvider();
		dao.setUserDetailsService(userDetServ());
		dao.setPasswordEncoder(endode());
		return dao;
	}
	
	
	@Bean//Authorization
	public SecurityFilterChain filter(HttpSecurity http) throws Exception
	{
		return http.csrf().disable()
				   .authorizeHttpRequests()
				   .requestMatchers("/users/**","/bookings/**","/hotels/**","/rooms/**")
				   .authenticated()
				   .and().formLogin().and().build();
	}
}
