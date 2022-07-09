function getVisitCountToday() {
  if (localStorage['myBoost.lastVisitDate'] === currentDateString()) {
    return parseInt(localStorage['myBoost.visitCount'] || '0')
  }
  return 0
}

function updateVisitCounter() {
  const count = getVisitCountToday()
  localStorage['myBoost.lastVisitDate'] = currentDateString()
  localStorage['myBoost.visitCount'] = count + 1
}

updateVisitCounter()

function addMutationObserver() {
  // Add a listener to detect when the "Trending" sidebar appears,
  // and modify it:
  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.target
        .querySelectorAll("div[aria-label='Timeline: Trending now']")
        .forEach(replaceContent)
    })
  })
  observer.observe(document.body, { subtree: true, childList: true })
}

function replaceContent(e) {
  // This will be called when the "Trending" sidebar's element was detected.
  // First, check to see if we have already modified it:
  if (e.hasAttribute('arc-boosted')) {
    return
  }
  e.setAttribute('arc-boosted', 'true')
  e.innerText = message()
}

// Start watching the page for changes:
addMutationObserver()

// HELPERS:

function message() {
  // The message that will replace the Trending sidebar.
  const count = getVisitCountToday()
  if (count > 10) {
    // TODO: Write your own messages to shame yourself
    return `You visited Twitter ${count} times today. Stop it!!!!`
  }
  if (count === 1) {
    return `First Twitter visit today! Hope it's your last...`
  }
  return `You've visited Twitter ${count} times today.`
}

function currentDateString() {
  const now = new Date()
  return `${now.getMonth()}/${now.getDay()}/${now.getFullYear()}`
}
