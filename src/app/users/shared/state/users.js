import axios from 'axios'
import { apiUrl } from '../config/config'

const state = {
  isLoadContacts: false,
  error: '',
  contacts: null,
  contactsSearchResult: null,
}

const getters = {
  isLoadContacts: state => state.isLoadContacts,
  error: state => state.error,
  contacts: state => state.contacts,
  contactsSearchResult: state => state.contactsSearchResult
}

const mutations = {
  getContactsSuccess(state, payload) {
    state.isLoadContacts = true
    state.contacts = payload.contacts
    state.contactsSearchResult = payload.contacts
  },
  getContactsSearchSuccess(state, payload) {
    state.contactsSearchResult = payload.contacts
  },
  getContactsError(state, error) {
    state.isLoadContacts = false
    state.error = error
  }
}

const actions = {
  searchContacts({ commit, state }, { userId, searchKey }) {
    if (searchKey.length > 0) {
      axios
        .get(`${apiUrl}/contacts?search=${searchKey}`)
        .then(r => r.data)
        .then(res => {
          if (res.status) {
            commit('getContactsSearchSuccess', { contacts: res.data, userId: userId })
          } else {
            commit('getContactsError', 'error:getContacts')
          }
        })
    } else {
      commit('getContactsSearchSuccess', { contacts: state.contacts, userId: userId })
    }
  },
  getContacts({ commit }, userId) {
    axios
      .get(`${apiUrl}/contacts`)
      .then(r => r.data)
      .then(res => {
        if (res.status) {
          commit('getContactsSuccess', { contacts: res.data, userId: userId })
        } else {
          commit('getContactsError', 'error:getContacts')
        }
      })
  },
  
}

export default {
  state,
  getters,
  mutations,
  actions
}
