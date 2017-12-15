import React, { Component } from 'react';
import '../css/font-awesome.min.css';
import '../css/responsive.css';

const imageurl="http://blog.dtml.org/games/";
class Footer extends Component {
		constructor(props){
		super(props)
		this.state={
			config : props.config		
		}
		}
  render() {
    return (
      <div>
      	 <div className="footertop-section"><img src={imageurl + 'images/footerbg-01.png'} alt="" /></div>
		 <div className="footersecion">
		  <div className="footersecion-main"> 
		    <div className="footersecion-main-left">
		      <ul>
		          <li><a href="https://www.facebook.com/distantteaching/"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
		          <li><a href="https://twitter.com/DistantTeaching"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
		          <li><a href="https://www.linkedin.com/company/distant-teaching-and-mobile-learning"><i className="fa fa-linkedin" aria-hidden="true"></i></a></li>
		          <li><a href="https://www.youtube.com/channel/UCwF13kloyxnifaNCHQUL2rQ/featured"><i className="fa fa-youtube" aria-hidden="true"></i></a></li>
		      </ul>
		      <div className="clr"></div>
		    </div>
		    <div className="footersecion-main-right"><p>dtml.org &copy; 2017 All Rights Reserved | <a href='https://dtml.org/Home/TermsandConditions'>{this.props.config.terms}</a> </p></div>
		    <div className="clr"></div>
		  </div>
		 </div>
    <!-- Facebook Pixel Code -->
    <script>
        !function (f, b, e, v, n, t, s) {
            if (f.fbq) return; n = f.fbq = function () {
                n.callMethod ?
                n.callMethod.apply(n, arguments) : n.queue.push(arguments)
            };
            if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
            n.queue = []; t = b.createElement(e); t.async = !0;
            t.src = v; s = b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t, s)
        }(window, document, 'script',
            'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '1648707511827840');
        fbq('track', 'PageView');
    </script>
    <noscript>
        <img height="1" width="1" style="display:none"
             src="https://www.facebook.com/tr?id=1648707511827840&ev=PageView&noscript=1" />
    </noscript>
    <!-- End Facebook Pixel Code -->

      </div>
    );
  }
}

export default Footer;
