package src.main.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/vasu")
public class HomeController {

    @RequestMapping("/home")
    public String home(Model model) {
        System.out.println("This is home url");
        model.addAttribute("name", "Vasu Bansal");
        model.addAttribute("age", 25);

        List<String> friends = new ArrayList<String>();
        friends.add("Ashmita");
        friends.add("Aditi");
        friends.add("Rohan");
        friends.add("Surabhi");
        model.addAttribute("friends", friends);

        return "index";
    }

    @RequestMapping("/about")
    public String about() {
        System.out.println("This is about url");
        return "about";
    }

    @RequestMapping("/help")
    public ModelAndView help() {
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("name", "Vasu");
        modelAndView.addObject("rollNo", 160776);

        List<Integer> marks = new ArrayList<Integer>();
        marks.add(90);
        marks.add(85);
        marks.add(98);
        marks.add(87);
        modelAndView.addObject("marks", marks);

        modelAndView.setViewName("help");

        return modelAndView;
    }

}
