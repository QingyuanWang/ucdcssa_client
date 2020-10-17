import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

import { ThreadListAnnouncement } from '../../components/thread_list_announcement'
export default class Index extends Component {
  state = {
    loading: true,
    threads: [],
    threadsContents: []
  }
  componentWillMount() { }

  async componentDidMount() {
    try {
      const threadsContents = []
      const domainName = 'https://ucdcssa.ie'
      const res = await Taro.request({
        url: 'https://ucdcssa.ie/api/threads/?category=2&list=all',
        method: 'GET',
      }
      )

      for(let i=0;i<res.data.results.length;i++){
        console.log(domainName + res.data.results[i].api.posts.index)
        let c = await Taro.request({
          url: domainName + res.data.results[i].api.posts.index,
          method: 'GET'
        })
        
        threadsContents.push(c.data)
      }
 
      this.setState({
        threadsContents: threadsContents,
        threads: res.data.results,
        loading: false
      })
    } catch (error) {
      console.log(error)
      if(error.errMsg!=undefined){
        Taro.showModal({
          content: error.errMsg
        })

      }else{
        Taro.showModal({
          content: error.toString()
        })
      }
      // Taro.showToast({
      //   title: '加载失败'
      // })
    }
  }
  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {

    const { threadsContents, loading, threads } = this.state
    return (
      <View className='index'>
        <ThreadListAnnouncement
          threadsContents={threadsContents}
          threads={threads}
          loading={loading}
        />
      </View>
    )
  }
}
