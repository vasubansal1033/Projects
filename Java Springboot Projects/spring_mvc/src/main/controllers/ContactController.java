package src.main.controllers;


import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import src.main.models.User;

@Controller
public class ContactController {

    @RequestMapping("/contact")
    public String contact() {
        return "contact";
    }

    @ModelAttribute
    public void commonDataForModel(Model model) {
        model.addAttribute("Header", "This is common data for every handler method");
    }

    @RequestMapping(path = "/processForm", method = RequestMethod.POST)
    public String process(@ModelAttribute User user,
                          Model model) {

        System.out.println(user);
//        model.addAttribute("user", user);

        return "success";
    }

//    @RequestMapping(path = "/processForm", method = RequestMethod.POST)
//    public String process(@RequestParam("userEmail") String userEmail,
//                          @RequestParam("userName") String userName,
//                          @RequestParam("userPassword") String userPassword,
//                          Model model) {
////        System.out.println(String.format("Your name is %s, and email is: %s and password: %s",
////                userName, userEmail, userPassword));
////        model.addAttribute("email", userEmail);
////        model.addAttribute("name", userName);
//
//        User user = new User(userEmail, userName, userPassword);
//        System.out.println(user);
//        model.addAttribute("user", user);
//
//        return "success";
//    }
}
