import React, { Component } from "react";
import { connect } from "react-redux";
// import ReactCrop, { makeAspectCrop } from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import { sendImage , deleteImage } from '../../../../actions/productsActions'
import styles from "./PhotoUploadSingle.module.css";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
const cropper = React.createRef(null);
class FileUpload extends Component {
	constructor() {
		super();
		this.setUpReader();
		this.state = {
			selectedFile: null,
			initialImageBase64: null,
			imageBase64: null,
			previewImage: null,
			cropImage: {},
			loading: false
		};
	}

	setUpReader = () => {
		// set up read instance from FileReader Contructor
		this.reader = new FileReader();
		// load event from reader instance >>
		this.reader.addEventListener("load", event => {
			const { initialImageBase64 } = this.state;
			const imageBase64 = event.target.result;
			if (initialImageBase64) {
				this.setState({
					imageBase64: imageBase64
				});
			} else {
				this.setState({
					imageBase64: imageBase64,
					initialImageBase64: imageBase64
				});
			}
		});
	};

	cancelCrop = () => {
		this.setState({
			selectedFile: null,
			initialImageBase64: null,
			imageBase64: null,
			previewImage: null,
			cropImage: {},
			loading: false
		});
		this.refs.cropper.cropper.destroy();
	};

	onChangeHandler = event => {
		const selectedFile = event.target.files[0];

		if (selectedFile) {
			this.setState({
				initialImageBase64: "",
				selectedFile
			});

			this.reader.readAsDataURL(selectedFile);
		}
	};

	uploadImage = () => {
		const { cropImage } = this.state;
		const { input } = this.props;

		if (cropImage) {
			// ACTION IMPLEMENT PLACE
			console.log("cropImage", cropImage);
		}
	};

	cropImage() {
		if (typeof this.refs.cropper.getCroppedCanvas() === "undefined") {
			return;
		}

		this.refs.cropper.getCroppedCanvas().toBlob(blob => {
			// let imgUrl = URL.createObjectURL(blob)
			this.setState({
				cropImage: blob
			});
		});
	}

	render() {
		const { crop, initialImageBase64 } = this.state;
		const { images, titleName } = this.props;
		const renderPhoto = () => {
			let imageExisted = this.props.initialValues
				? this.props.initialValues.qrcode.url
				: null;
			return (
				<div>
					<img className="img-fluid" src={imageExisted} alt="" />
				</div>
			);
		};

		return (
			<div className="card container m-1 p-1s">
				<div className="row">
					<div className="col-md-4">
						<div class="custom-file my-2 py-2">
							<input
								type="file"
								className="form-control-file"
								accept=".jpg, .png, .jpeg"
								onChange={this.onChangeHandler}
								id="customFile"
							/>
							<label class="custom-file-label" for="customFile">
								Choose file
							</label>
						</div>
						{/* <div class="form-group">
							<input
							
							/>
						</div> */}
					</div>
					<div className="col-md-5">
						{initialImageBase64 && (
							<div
								className="btn-group my-1 py-2"
								role="group"
								aria-label="Basic example"
							>
								<button
									type="button"
									className="btn btn-secondary outline btn-sm"
									onClick={this.uploadImage}
								>
									upload image
								</button>

								<button
									type="button"
									className="btn btn-secondary outline btn-sm"
									onClick={this.cancelCrop}
								>
									X
								</button>
							</div>
						)}
						<Cropper
							style={{ height: 200, width: "50%" }}
							ref={"cropper"}
							src={this.state.initialImageBase64}
							viewMode={0}
							// dragMode="move"
							guides={false}
							scalable={false}
							// cropBoxMovable={true}
							// cropBoxResizable={true}

							crop={this.cropImage.bind(this)}
						/>
					</div>
				</div>

				<div className="container">
					<div className="col-6">
						{this.state.previewImage && (
							<div>
								<img
									className="img-fluid"
									src={this.state.previewImage.url}
									alt=""
								/>
							</div>
						)}
						{renderPhoto()}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps)(FileUpload);
