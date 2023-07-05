const textarea = document.getElementById('textarea')
const tags = document.getElementById('tags')

textarea.focus()
function renderTags(arr) {
    let html = fragment = new DocumentFragment()
    tags.innerHTML = ''
    for (v of arr) {
        let span = document.createElement('span')
        span.classList.add('tag')
        span.innerText = v;
        html.appendChild(span)
    }
    tags.appendChild(html)
}

textarea.addEventListener('keyup', (e) => {
    let tags = e.target.value.split(',').filter(v => v.trim() != '').map(v => v.trim())
    renderTags(tags)
    if (e.key === 'Enter') {
        setTimeout(() => {
            e.target.value = ''
        }, 10)

        randomSelect()
    }
})

function randomSelect() {
    const times = 30

    const interval = setInterval(() => {
        const randomTag = pickRandomTag()

        if (randomTag !== undefined) {
            highlightTag(randomTag)

            setTimeout(() => {
                unHighlightTag(randomTag)
            }, 100)
        }
    }, 100);

    setTimeout(() => {
        clearInterval(interval)

        setTimeout(() => {
            const randomTag = pickRandomTag()

            highlightTag(randomTag)
        }, 100)

    }, times * 100)
}

function pickRandomTag() {
    const tags = document.querySelectorAll('.tag')
    return tags[Math.floor(Math.random() * tags.length)]
}

function highlightTag(tag) {
    tag.classList.add('highlight')
}

function unHighlightTag(tag) {
    tag.classList.remove('highlight')
}