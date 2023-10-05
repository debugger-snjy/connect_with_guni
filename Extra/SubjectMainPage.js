import React from 'react'
import WebLinks from "../Components/WebLinks"
import subjectMain from "../CSS/SubjectMain.css"

function SubjectMainPage() {
	return (
		<>
			<div className="container-fluid text-white mt-3">
				<WebLinks />

				<hr className='hrStyle' />

				<h5>Your Subjects</h5>

				<div class="container-fluid text-center">

					<div className="col-xsm-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 text-right" >
						<div className="row">
							<div className="col-md-12 col-lg-6 menutextStyle mt-5">
								<div className="subjectbox">
									<div class="card">
										<div className="imgbg"></div>
										<div class="card-body">
											<p class="card-text px-4 py-0 m-0" style={{"textAlign" : "left"}}>Theory of Computation</p>
											<p class="card-text px-4 py-0 small" style={{"textAlign" : "left", "fontStyle" : "italic", "fontWeight" : "normal"}}>Faculty : MNP, BNJ, ADS, RU </p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-12 col-lg-6 menutextStyle mt-5">
								<div className="subjectbox">
									<div class="card">
										<div className="imgbg"></div>
										<div class="card-body">
											<p class="card-text px-4 py-0 m-0" style={{"textAlign" : "left"}}>Ethical Hacking</p>
											<p class="card-text px-4 py-0 small" style={{"textAlign" : "left", "fontStyle" : "italic", "fontWeight" : "normal"}}>Faculty : MNP, PMS</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-12 col-lg-6 menutextStyle mt-5">
								<div className="subjectbox">
									<div class="card">
										<div className="imgbg"></div>
										<div class="card-body">
											<p class="card-text px-4 py-0 m-0" style={{"textAlign" : "left"}}>Web Technology</p>
											<p class="card-text px-4 py-0 small" style={{"textAlign" : "left", "fontStyle" : "italic", "fontWeight" : "normal"}}>Faculty : RVM, HHP, MBP, ZJP</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-12 col-lg-6 menutextStyle mt-5">
								<div className="subjectbox">
									<div class="card">
										<div className="imgbg"></div>
										<div class="card-body">
											<p class="card-text px-4 py-0 m-0" style={{"textAlign" : "left"}}>User Experience</p>
											<p class="card-text px-4 py-0 small" style={{"textAlign" : "left", "fontStyle" : "italic", "fontWeight" : "normal"}}>Faculty : MBD, ZJP</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</>
	)
}

export default SubjectMainPage
