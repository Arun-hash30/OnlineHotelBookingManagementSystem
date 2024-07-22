package com.example.ohbs.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.example.ohbs.filter.JwtAuthFilter;
import com.example.ohbs.service.UseruserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class AppConfig {
	@Autowired
	private JwtAuthFilter authFilter;

	// Authentication
	@Bean
	public UserDetailsService userDetServ() {
		/*
		 * UserDetails admin=User.withUsername("abhi") .password(pw.encode("pwd1"))
		 * .roles("ADMIN") .build(); UserDetails user1=User.withUsername("sheela")
		 * .password(pw.encode("pwd2")) .roles("USER") .build(); UserDetails
		 * user2=User.withUsername("purush") .password(pw.encode("pwd3")) .roles("USER")
		 * .build();
		 */

		return new UseruserDetailsService();
	}

	@Bean // Encrypiting the passwords
	public PasswordEncoder endode() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public AuthenticationProvider provider() {
		DaoAuthenticationProvider dao = new DaoAuthenticationProvider();
		dao.setUserDetailsService(userDetServ());
		dao.setPasswordEncoder(endode());
		return dao;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

	@Bean // Authorization
	public SecurityFilterChain filter(HttpSecurity http) throws Exception {
		return http.csrf().disable().authorizeHttpRequests()
				.requestMatchers("/users/create","/users/getAll","/users/{id}", "/hotels/create", "/hotels/getAll","/rooms/create","/rooms/getAll","/rooms/{id}", "/hotels/{id}","/rooms/price/{price}",
						"/rooms/rating/{starRating}", "/rooms/hotel-address/{letters}", "/bookings/create", "/bookings/getAll",
						"/users/login")
				.permitAll().and().authorizeHttpRequests()
				.requestMatchers(  
						 "/rooms/price/{price}", "/rooms/available", "/bookings/{id}")
				.authenticated().and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
				.authenticationProvider(provider())
				.addFilterBefore(authFilter, UsernamePasswordAuthenticationFilter.class).build();

	}
}