package src.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.view.RedirectView;

@Controller
public class ReController {

    @RequestMapping("always_error")
    public String errorHandler() throws Exception {
        Exception NumberFormatException = new NumberFormatException("Number format exception");
        throw NumberFormatException;
    }
    @RequestMapping("/one")
    public RedirectView one() {
        System.out.println("This is handler one");
        RedirectView redirectView = new RedirectView();
        redirectView.setUrl("/two");

        return redirectView;
    }
//    public String one() {
//        System.out.println("This is handler one");
//        return "redirect:/two";
//    }
    @RequestMapping("/two")
    public String two() {
        System.out.println("This handler two");
        return "contact";
    }
}
