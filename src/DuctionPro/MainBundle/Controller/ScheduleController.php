<?php

namespace DuctionPro\MainBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ScheduleController extends Controller
{
    public function scheduleIndexAction()
    {
        return $this->render('DuctionProMainBundle:Schedule:scheduleIndex.html.twig');
    }
}
