const express=require('express');
const teamController=require('../controllers/teamController');
const authController=require('./../controllers/authController');

const router=express.Router();

router.route('/participants')
    .post(authController.protect,teamController.createParticipant)
    .get(teamController.getParticipants);
router.route('/top')
    .get(teamController.getTop);
router.route('/top/:teamName')
    .get(teamController.getTopByTeam);
router.route('/team/youngest')
    .get(teamController.getYoungest);
router.route('/team/:teamName/members')
    .get(teamController.getTeamMembers);
router.route('/participant/:id/card')
    .get(teamController.getCard);

module.exports=router;
