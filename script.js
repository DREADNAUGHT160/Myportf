// Function to show the content list
function showMenu() {
  // Slide name to the left and hide it
  document.getElementById("name").classList.add("slide-left");

  // After animation completes, show the content list and back arrow
  setTimeout(function() {
      document.getElementById("name").style.display = "none";
      document.getElementById("content-list").style.display = "block";
      document.getElementById("back-arrow").style.display = "block"; // Show the back arrow
  }, 500); // Delay matches the CSS transition duration
}

// Function to go back to the previous view
function goBack() {
  // Determine which section is currently visible and hide it
  if (document.getElementById("cv-details-container").style.display === "block") {
      hideDetail();
  } else if (document.getElementById("introduction-topics-container").style.display === "block") {
      hideIntroductionTopics();
  } else if (document.querySelector('.section.active')) {
      hideSection();
  } else {
      showName();
  }
}

// Function to show the name again
function showName() {
  // Hide content list
  document.getElementById("content-list").style.display = "none";
  // Hide back arrow
  document.getElementById("back-arrow").style.display = "none";
  // Show the name again
  document.getElementById("name").style.display = "block";
  document.getElementById("name").classList.remove("slide-left");
}

// Function to show the Introduction topics branching out
function showIntroduction(event) {
  event.preventDefault(); // Prevent default link behavior

  // Hide other sections if any
  hideIntroductionTopics();

  // Show the Introduction topics container
  const topicsContainer = document.getElementById("introduction-topics-container");
  topicsContainer.style.display = "block";

  // Position Introduction anchor in center
  const introAnchor = document.getElementById("introduction-anchor");

  // Show and animate the topics
  const topics = document.querySelectorAll(".intro-topic");
  topics.forEach(function(topic, index) {
      // Animate the appearance
      setTimeout(function() {
          topic.classList.add("visible");
      }, index * 100);
  });

  // Draw connections
  setTimeout(function() {
      drawIntroConnections();
  }, 500);
}

// Function to hide the Introduction topics
function hideIntroductionTopics() {
  // Hide the topics
  const topicsContainer = document.getElementById("introduction-topics-container");
  const topics = document.querySelectorAll(".intro-topic");
  topics.forEach(function(topic) {
      topic.classList.remove("visible");
  });

  // Clear connections
  const svg = document.getElementById("intro-connections-svg");
  while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
  }

  // Hide the container after animations
  setTimeout(function() {
      topicsContainer.style.display = "none";
  }, 500);
}

// Function to show detailed CV section
function showDetail(detailId) {
  // Hide the topics and connections
  hideIntroductionTopics();

  // Show the detailed section
  document.getElementById("cv-details-container").style.display = "block";

  // Show the relevant detail
  const detailElementId = "detail-" + detailId;
  document.getElementById(detailElementId).classList.add("active");
}

// Function to hide detailed CV section
function hideDetail() {
  // Hide the detailed section
  document.getElementById("cv-details-container").style.display = "none";
  const activeDetail = document.querySelector('.cv-detail.active');
  if (activeDetail) {
      activeDetail.classList.remove("active");
  }

  // Show the Introduction topics again
  showIntroductionTopics();
}

// Function to show the Introduction topics again
function showIntroductionTopics() {
  const topicsContainer = document.getElementById("introduction-topics-container");
  topicsContainer.style.display = "block";

  const topics = document.querySelectorAll(".intro-topic");
  topics.forEach(function(topic, index) {
      setTimeout(function() {
          topic.classList.add("visible");
      }, index * 100);
  });

  // Redraw connections
  setTimeout(function() {
      drawIntroConnections();
  }, 500);
}

// Function to draw connections between Introduction anchor and topics
function drawIntroConnections() {
  const svg = document.getElementById("intro-connections-svg");
  // Clear existing connections
  while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
  }

  const introAnchor = document.getElementById("introduction-anchor");
  const introRect = introAnchor.getBoundingClientRect();

  const topics = document.querySelectorAll(".intro-topic");
  topics.forEach(function(topic) {
      const topicRect = topic.getBoundingClientRect();

      // Calculate starting and ending points
      const startX = introRect.right;
      const startY = introRect.top + introRect.height / 2;

      const endX = topicRect.left;
      const endY = topicRect.top + topicRect.height / 2;

      // Create a line element
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      line.setAttribute("x1", startX);
      line.setAttribute("y1", startY);
      line.setAttribute("x2", endX);
      line.setAttribute("y2", endY);
      line.setAttribute("stroke", "black");
      line.setAttribute("stroke-width", "2");

      // Append the line to the SVG
      svg.appendChild(line);
  });
}

// Function to show other sections (Projects, Contact, Hobbies)
function showSection(sectionId) {
  // Hide content list
  document.getElementById("content-list").style.display = "none";

  // Hide Introduction topics if visible
  hideIntroductionTopics();

  // Show the selected section
  const section = document.getElementById(sectionId);
  section.classList.add("active");
  section.style.display = "block";

  // Back arrow is already displayed
}

// Function to hide other sections
function hideSection() {
  const activeSection = document.querySelector('.section.active');
  if (activeSection) {
      activeSection.style.display = "none";
      activeSection.classList.remove("active");
  }

  // Show content list again
  document.getElementById("content-list").style.display = "block";
}
