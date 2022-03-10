package com.example.demo;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ReceiveListController {

	@PostMapping(value = "/takeEmails")
	public String index(String[] emails) {
		System.out.println(emails.length);
		return "success size " + emails.length;
	}

}
