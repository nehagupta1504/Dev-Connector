import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/spinner";
import { getGithubRepos } from "../../actions/profile";
const ProfileGithub = ({ getGithubRepos, username, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);
  return (
    <>
      <div class="profile-github">
        <h2 class="text-primary my-1">
          <i class="fab fa-github"></i>Github Repos
        </h2>

        {repos === null ? (
          <Spinner />
        ) : repos.length > 0 ? (
          repos.map((repo, index) => {
            const {
              name,
              html_url,
              description,
              stargazers_count,
              watchers,
              forks_count,
            } = repo;
            return (
              <>
                <div class="repo bg-white my-1 p-1" key={repo._id}>
                  <div>
                    <h4>
                      <a
                        href={html_url}
                        target="_blank"
                        rel="noopner noreferrer"
                      >
                        {name}
                      </a>
                    </h4>
                    <p>{description}</p>
                  </div>
                  <div>
                    <ul>
                      <li class="badge badge-primary">
                        Stars:{stargazers_count}
                      </li>
                      <li class="badge badge-dark">Watchers: {watchers}</li>
                      <li class="badge badge-light">Forks: {forks_count}</li>
                    </ul>
                  </div>
                </div>
              </>
            );
          })
        ) : (
          `No repos found for ${username}`
        )}
      </div>
    </>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};
const mapStateToProps = (state) => {
  return {
    repos: state.profile.repos,
  };
};

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
