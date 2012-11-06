<?php

namespace DuctionPro\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('DuctionProMainBundle:Default:index.html.twig', array('name' => $name));
    }
}
