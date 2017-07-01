/*
(c) Copyright Weborama SA - France. All rights reserved.
It is illegal to modify, disassemble, sell, copy or publish this software
or any part thereof. The use of this software is only permitted with the
prior and express written permission of Weborama SA - France.
More information: http://www.weborama.com/contacts/
*/
function x17() {
    var x1cl, x1ey = x1bb.x1cj();
    x1ey.x1ie = x1bb.x1nn(x1ey.x1ie,'wuid=&retargeting=&');
    x1ey.x1fN = 'http://cstatic.weborama.fr/advertiser/3247/3/73/101/';
    x1ey.x1lp = '414';



    x1ey.conf_oba = false;
    
    adperfobj.zindex = adperfobj.zindex || 0 || 214748360;

    adperfobj.clicks = new Array();
    adperfobj.clicks[0] = 'https://adclick.g.doubleclick.net/pcs/click?xai=AKAOjsvmXcAqztcCS_6vm7ljbTjfN6yHRmRQ2m383LEmUbcrLQr9zn0TQZBo1HI48lE10UxnFQbPrhMRXWddZYQUS3-SSQGUXJ7Jj9wBtL1wbOYSehMxVwEUKtAKhQw8XNkqWz2MNmWTydndq2Rn5J3reo3874M4KURC9lF7mF3IUZkfbVzKvrNLfZ3SnUEqHky8r_pPkj9DXmKnax3k69EzJmdTt1IXlSwNagyyvptkf2iGWT4EeQ&sig=Cg0ArKJSzNYV8FoaiXMCEAE&urlfix=1&adurl=http%3A%2F%2Fsecuritasdirectportugal2.solution.weborama.fr%2Ffcgi-bin%2Fdispatch.fcgi%3Fa.A%3Dcl%26a.si%3D3247%26a.te%3D132%26a.aap%3D414%26a.agi%3D158%26g.lu%3D' + (adperfobj.landing_urls[0] || '');


    try{
        adperfobj.imptrackers = new Array(
                
        );

        adperfobj.clicktrackers = (new Array(
                
        ).concat(adperfobj.clicktrackers));

        adperfobj.eventtrackers = (new Array(
                
        ).concat(adperfobj.eventtrackers));
    }catch(scr_e){}



    x1ey.addTrackers(adperfobj);
    x1ey.addClicks(adperfobj);

    x1cl = new x1bb.x1ig();
x1cl.x1c(x1ey, 1126, '300x600.html', adperfobj.width, adperfobj.height, '', '', '');
x1ey.x1gG(x1cl, '', 2, '');




    x1ey.x1gQ();


}
x1L('adperf_core_' + adperf_version + '_scrambled.js');