declare namespace App {
	// interface Error {}
	interface Locals {
	  pb: import('pocketbase').default
	  user: import('pocketbase').default['authStore']['model']
	}
	// interface PageData {}
	// interface Platform {}
  }