import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtCard } from "taro-ui"

export default class ThreadListAnnouncement extends Component {
  static defaultProps = {
    threads: [],
    loading: true,
    threadsContents : []
  }
  
  render () {
    const domainName = 'https://ucdcssa.ie'
    const { threadsContents, loading, threads } = this.props
    if (loading) {
      return <AtCard/>
    }
    
    const element = threads.map((thread, index) => {
      let content =threadsContents[index].post_set.results[0].content.replace(/<.*?>/ig,"")
      if (content.length>50){
        content = content.substring(0,50)+'...'
      }
      return (
        <AtCard
        note={thread.starter_name+' '+thread.started_on.split('T')[0]}
        extra='公告'
        title={thread.title}
        thumb={domainName+thread.starter.avatars[6].url}
        isFull={true}
        >
          {content}
        </AtCard>  
      )
    })

    return (
      <View className='thread-list'>
        {element}
      </View>
    )
  }
}

export { ThreadListAnnouncement }