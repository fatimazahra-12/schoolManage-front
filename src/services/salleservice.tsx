import axios from 'axios'
import type { Salle, CreateSalleDto, UpdateSalleDto } from '../types/salle'
import { api } from './api'

const ENDPOINT = '/salles'

export const salleService = {
  // Get all salles
  async getAllSalles(): Promise<Salle[]> {
    try {
      const { data } = await api.get<Salle[]>(ENDPOINT)
      return data
    } catch (error) {
      throw toSalleError(error, 'Failed to fetch salles')
    }
  },

  // Get salle by ID
  async getSalleById(id: number): Promise<Salle> {
    try {
      const { data } = await api.get<Salle>(`${ENDPOINT}/${id}`)
      return data
    } catch (error) {
      throw toSalleError(error, 'Failed to fetch salle')
    }
  },

  // Create new salle
  async createSalle(data: CreateSalleDto): Promise<Salle> {
    try {
      const response = await api.post<Salle>(ENDPOINT, data)
      return response.data
    } catch (error) {
      throw toSalleError(error, 'Failed to create salle')
    }
  },

  // Update salle
  async updateSalle(id: number, data: UpdateSalleDto): Promise<Salle> {
    try {
      const response = await api.put<Salle>(`${ENDPOINT}/${id}`, data)
      return response.data
    } catch (error) {
      throw toSalleError(error, 'Failed to update salle')
    }
  },

  // Delete salle
  async deleteSalle(id: number): Promise<void> {
    try {
      await api.delete(`${ENDPOINT}/${id}`)
    } catch (error) {
      throw toSalleError(error, 'Failed to delete salle')
    }
  },
}

const toSalleError = (error: unknown, fallback: string): Error => {
  if (axios.isAxiosError(error)) {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message
    return new Error(message || fallback)
  }
  return new Error(fallback)
}
