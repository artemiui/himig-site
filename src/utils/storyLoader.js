export const loadStories = async () => {
  try {
    const story1 = await import('../data/stories/story1.json')
    const story2 = await import('../data/stories/story2.json')
    const story3 = await import('../data/stories/story3.json')
    const story4 = await import('../data/stories/story4.json')
    const story5 = await import('../data/stories/story5.json')
    
    return [
      story1.default,
      story2.default,
      story3.default,
      story4.default,
      story5.default,
    ]
  } catch (error) {
    console.error('Error loading stories:', error)
    return []
  }
}

export const getStoryById = async (id) => {
  try {
    const stories = await loadStories()
    return stories.find(story => story.id === id)
  } catch (error) {
    console.error('Error loading story:', error)
    return null
  }
}

