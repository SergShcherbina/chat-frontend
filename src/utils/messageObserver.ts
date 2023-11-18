export const messageObserver = (observedElement: HTMLDivElement) => {
    const observer = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        if (entries[0].isIntersecting) {
            observedElement.scrollIntoView({behavior: "smooth"})
            // observer.disconnect()
        }
    }, {threshold: 0});

    observer.observe(observedElement)
}