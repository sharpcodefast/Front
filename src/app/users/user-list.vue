<template>
	<div>
		<b-row>
			<b-colxx xxs="12">
				<piaf-breadcrumb :heading="$t('menu.users')" />
				<div class="separator mb-5"></div>
			</b-colxx>
		</b-row>
		<b-row>
			<b-colxx xxs="12">
				<b-card class="mb-4" :title="$t('menu.users')">
					<div v-for="(user, index) in users" :key="index">
						<app-user-item :user="user" :name="user.name" />
					</div>
				</b-card>
			</b-colxx>
		</b-row>
		<b-row>
			<b-colxx xxs="12">
				<b-card class="mb-4" :title="$t('menu.users')">
					<contact-list
						v-if="isLoadContacts"
						key="contactList"
						:data="contactsSearchResult"
						@select-contact="selectContact"
					/>
					<div v-else class="loading" key="contactListLoading"></div>
				</b-card>
			</b-colxx>
		</b-row>
        <b-row>
			<b-colxx xxs="12">
				<b-card class="mb-4" :title="$t('menu.users')">
					<div v-for="(user, index) in otherUsers" :key="index">
					<div>{{ user.title }}</div>
					</div>
				</b-card>
			</b-colxx>
		</b-row>
	</div>
</template>

<script>
import AppUserItem from "./user-item.vue";
import { mapGetters, mapActions } from "vuex";
import ContactList from "../../components/ChatApp/ContactList";
import UsersService from "./services/users";

export default {
	name: "app-user-list",
	components: {
		AppUserItem,
		"contact-list": ContactList,
	},
	data() {
		return {
			tabIndex: 0,
			message: "",
			searchKey: "",
			isLoadCurrentConversation: false,
			otherUser: null,
			conversationMessages: null,
			users: [
				{
					id: 1,
					name: "Arun Kumar",
					age: "25",
					profession: "Software developer",
				},
				{
					id: 2,
					name: "Deepak Jha",
					age: "32",
					profession: "Application Architect",
				},
            ],
            otherUsers: []
		};
	},
	computed: {
		...mapGetters([
			"currentUser",
			"isLoadContacts",
			"error",
			"contacts",
			"contactsSearchResult",
		]),
	},
	methods: {
		...mapActions(["getContacts", "searchContacts"]),

		selectContact(userId) {
			this.otherUser = this.contacts.find((x) => x.id === userId);
			console.log(this.otherUser);
			this.searchKey = "";
		},
	},
	mounted() {
		this.getContacts({
			userId: this.currentUser.id,
			searchKey: "",
		});
        
        UsersService.fetchUsers().then(res => {
            this.otherUsers = res.data;
            console.log(this.otherUsers);
        });
        
		document.body.classList.add("no-footer");
	},
	beforeDestroy() {
		document.body.classList.remove("no-footer");
	},
	watch: {
		searchKey(val, oldVal) {
			this.searchContacts({
				userId: this.currentUser.id,
				searchKey: val,
			});
		},
	},
};
</script>

<style lang="scss" scoped>
</style>