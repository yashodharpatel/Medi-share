import React from 'react'

export const Footer = () => {
  return (
    <footer>
      <div className="footer set-width-1400">
        <div className="footer-firsthalf">
          <div className="field">
            <div className="footer-logo">
              <div>
                {/* <img src={logo} alt="logo" className="footer-logo-img" /> */}
              </div>
              <div className="px-2">
                <div className="footer-logo-name">Medi Share</div>
                <div className="footer-sub-logo-name">Donate Unuse Medicine</div>
              </div>
            </div>
          </div>
          <div>
            <div className="field">
              <div className="footer-titles">Contact us:</div>
              <div style={{paddingTop:"2px"}}>
                9969124603
              </div>
            </div>
            <div className="field">
              <div className="footer-titles">Find us on:  </div>
              <div className="footer-socials">
                <i class="fab fa-twitter" />
                <i class="fab fa-instagram" />
                <i class="fab fa-linkedin" />
                <i class="fab fa-facebook" />
                <i class="fab fa-youtube" />
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div>&copy; 2023 Medi-Share. All Rights Reserved.</div>
      </div>
    </footer>
  )
}
