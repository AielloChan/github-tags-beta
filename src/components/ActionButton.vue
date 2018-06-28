<template>
  <!-- eslint-disable -->
  <div class="select-menu"
    aria-expanded="false">
    <button class="btn btn-sm btn-with-count select-menu-button"
      aria-label="You must be signed in to watch a repository"
      rel="nofollow"
      :class="{selected:isPanelOpen}"
      @click.stop="togglePanel">
      <svg class="octicon icon icon-tags"
        aria-hidden="true">
        <use xlink:href="#icon-tags"></use>
      </svg>
      Tags
    </button>
    <a class="social-count"
      href="/AielloChan/github-tags-beta/watchers"
      aria-label="1 user is watching this repository"
      v-cloak>
      {{usedTags.length}}
    </a>
    <!-- 遮罩层 -->
    <MaskLayer :open="isPanelOpen"
      @on-close="onclose" />

    <div class="select-menu-modal-holder"
      style="display:block"
      v-show="isPanelOpen">
      <div class="select-menu-modal subscription-menu-modal">
        <div class="select-menu-header"
          tabindex="-1">
          <svg class="octicon icon icon-cancel"
            aria-hidden="true">
            <use xlink:href="#icon-cancel"></use>
          </svg>
          <span class="select-menu-title">Add tags</span>
        </div>

        <div class="select-menu-list"
          role="menu">
          <VueTagsSimple :UsedTagIds="store.usedTags"
            :AllTags="store.allTags"
            :NextTagId="store.globalId"
            @after-change-used-tag="afterChangeUsedTag"
            :Placeholder="__('inputPlaceholder')"
            AutoComplete="true"></VueTagsSimple>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import VueTagsSimple from 'vue-tags-simple'
import { PullData, PushData } from '@/store/local'
import MaskLayer from './MaskLayer'

const curRepoAddr = (() => {
  const path = window.location.pathname
  if (path.length === 0) return null
  const results = /([^/]+\/[^/]+)/.exec(path)
  if (results.length > 0) {
    return results[0]
  }
  return null
})()
const store = PullData(curRepoAddr)

export default {
  name: 'ActionButton',
  data() {
    return {
      isPanelOpen: false,
      usedTags: store.usedTags,
      globalId: store.globalId,
      allTags: store.allTags
    }
  },
  computed: {
    store() {
      return store
    }
  },
  methods: {
    togglePanel() {
      this.isPanelOpen = !this.isPanelOpen
    },
    onclose() {
      this.togglePanel()
      this.saveData()
    },
    saveData() {
      PushData(curRepoAddr, this.allTags, this.usedTags, this.globalId)
    },
    afterChangeUsedTag(data) {
      this.usedTags = data.usedTagIds
      this.allTags = data.allTags
      this.globalId = data.globalNextId
    }
  },
  components: {
    VueTagsSimple,
    MaskLayer
  }
}
</script>

<style scoped>
.actionButton {
  overflow: hidden;
  z-index: 20;
}

/* .actionButton-svg {
  width: 15px
  height: 15px
  vertical-align: middle
  fill: #24292e
}

.actionButton-svg.saving {
  fill: #fff
  animation: upload 1s ease-out 0s infinite
}

.actionButton-svg.fetching {
  animation: fresh 1s ease-out 0s infinite
}

@keyframes upload {
  0% {
    margin-bottom: -40px
  }
  50% {
    margin-bottom: 4px
  }
  100% {
    margin-bottom: 4px
  }
}

@keyframes fresh {
  to {
    transform: rotate(-180deg)
  }
}

.socialCount {
  user-select: none
} */
</style>
