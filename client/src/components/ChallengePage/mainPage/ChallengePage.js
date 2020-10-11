import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import network from "../../../services/network";
import normalizeDate from "../helpers/normalizeDate";
import { Button, Link } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Chip from "@material-ui/core/Chip";
import "./ChallengePage.css";
import SubmitModal from "../SubmitModal";
import InfoTable from "../InfoTable/InfoTable";

// TODO: clean all console alert and logs before merge

// we have two users
// 1. author- the user which uploaded that challenge
// 2. user -  the user that is logged in to the system
const userId = 2; //Mock until we merge shahar

function ChallengePage() {
	const [challenge, setChallenge] = useState(null);
	const { challengeParamId } = useParams();
	const [blobedImg, setBlobedImg] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	useEffect(() => {
		const setImg = async () => {
			try {
				const { data } = await network.get(
					`/api/v1/images?id=${challengeParamId}`
				);
				setBlobedImg(data.img);
			} catch (error) {
				console.log(error);
			}
		};
		const fetchChallenge = async () => {
			try {
				let {
					data: { challenge: challengeFromServer, author }
				} = await network.get(`/api/v1/challenges/${challengeParamId}`);
				console.log("challenge from server: ", challengeFromServer);
				challengeFromServer.author = author;
				setChallenge(challengeFromServer);
			} catch (error) {
				console.log(error);
			}
		};
		setImg();
		fetchChallenge();
	}, [challengeParamId]);

	function handleModalClose() {
		setIsModalOpen(false);
	}
	console.table(challenge);
	console.log({ blobedImg });

	return challenge ? (
		<div className="fullpage-wrapper">
			<div className="navbar">im navbar</div>
			<div className="challenge-wrapper">
				<div className="challenge-left-wrapper">
					<div className="challenge-img-div">
						<img
							className="challenge-img"
							src={blobedImg}
							alt={challenge.name}
						/>
					</div>
					<div className="challenge-rawdata">
						<span className="challenge-created-by">
							<p> created by: </p> <p>{challenge.author.userName}</p>
						</span>
						<span className="challenge-created-at">
							<p> Created at: </p>{" "}
							<p>{normalizeDate(challenge.createdAt) + " "} </p>
						</span>
						<span className="challenge-updated-at">
							<p> Updated at: </p> <p>{normalizeDate(challenge.updatedAt)}</p>
						</span>
					</div>
					<div className="challenge-labels">
						<h2>Labels:</h2>
						<span className="challenge-label">
							{challenge["Labels"].map(label => (
								<Link to={`/?labelId=${label.id}`}>
									<Chip
										color="primary"
										label={label.name}
										component="a"
										href="#chip"
										clickable
									/>
								</Link>
							))}
						</span>
					</div>
					<div className="challenge-rating">
						<h2>Rating:</h2>
						<Rating
							name="half-rating-read"
							// TODO: add rating after dror finish with his rating at the backend
							defaultValue={5}
							precision={0.5}
							readOnly
							size="large"
						/>
					</div>
					<div className="challenge-github-btn">
						<Button
							color="primary"
							href={`https://github.com/suvelocity/${challenge.boilerPlate}`}>
							Fork boiler plate
						</Button>
					</div>
				</div>
				<div className="challenge-right-wrapper">
					<div className="challenge-title-description">
						<div className="challenge-name">
							<h1>{challenge.name}</h1>
						</div>
						<div className="challenge-description">
							<p>{challenge.description}</p>
						</div>
					</div>
					<div className="challenge-solution-table">
						<InfoTable challengeId={challengeParamId} />
					</div>
					<div className="challenge-submit-btn">
						<Button color="primary" onClick={() => setIsModalOpen(true)}>
							Submit
						</Button>
					</div>
				</div>
			</div>

			<SubmitModal
				isOpen={isModalOpen}
				handleClose={handleModalClose}
				challengeParamId={challengeParamId}
				userId={userId}
			/>
		</div>
	) : (
		<div>Loading</div>
	);
}

export default ChallengePage;