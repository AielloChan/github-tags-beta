const DATA_KEY = 'Github-tags-data'
const DATA_TEMPLATE = '{"version":"1.0","globalId":0,"allTags":{},"repos":{}}'

// 初始化存储
// 为提升性能，检查成功时直接返回该数据
export function Init() {
  window.localStorage.setItem(DATA_KEY, DATA_TEMPLATE)
  return JSON.parse(DATA_TEMPLATE)
}

// 检测存储是否可用
// 为提升性能，检查成功时直接返回该数据
export function Check() {
  const githubTagsData = window.localStorage.getItem(DATA_KEY)
  // TODO: 需要更详细的检查，如数据结构是否正确，是否混乱等
  if (githubTagsData === null) {
    return Init()
  }
  return JSON.parse(githubTagsData)
}

// 传入 repo 地址
export function PullData(repoAddr) {
  if (!repoAddr || repoAddr.length < 3) {
    // eslint-disable-next-line
    console.error('输入 repo 地址错误', repoAddr)
  }
  const githubTagsData = Check()

  // 现在 githubTagsData 已完全可用
  return {
    allTags: githubTagsData.allTags,
    usedTags: githubTagsData.repos[repoAddr] || [],
    globalId: githubTagsData.globalId
  }
}

// 传入 repo 地址、allTags、usedTags、globalId
export function PushData(repoAddr, allTags, usedTags, globalId) {
  if (!repoAddr || repoAddr.length < 3) {
    // eslint-disable-next-line
    console.error('输入 repo 地址错误', repoAddr)
  }
  const githubTagsData = Check()

  // 现在 githubTagsData 已完全可用
  githubTagsData.globalId = globalId
  usedTags.forEach(id => {
    if (githubTagsData.allTags[id] === undefined) {
      githubTagsData.allTags[id] = allTags[id]
    }
  })
  githubTagsData.repos[repoAddr] = usedTags

  window.localStorage.setItem(DATA_KEY, JSON.stringify(githubTagsData))
}
